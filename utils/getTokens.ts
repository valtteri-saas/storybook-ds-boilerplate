import tokensFile from '../tokens/tokens.json';
const tokens = tokensFile['design-tokens'];

export interface ResolvedTokenMeta {
  type: string;
  value: any;
  description?: string;
  resolvedValue: any;
}

export const getTokens = (path: string): Record<string, ResolvedTokenMeta> => {
  const result: Record<string, ResolvedTokenMeta> = {};
  try {
    const parts = path.trim().split('.');
    let node: any = tokens;
    for (const part of parts) {
      if (typeof node === 'object' && part in node) {
        node = node[part];
      } else {
        // Not found
        return {};
      }
    }
    flattenStructuredTokens(node, result, parts.join('.'));
  } catch (e) {
    return {};
  }
  return result;
};

function flattenStructuredTokens(
  obj: Record<string, any>,
  output: Record<string, ResolvedTokenMeta>,
  prefix: string,
) {
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = `${prefix}.${key}`;
    if (val && typeof val === 'object' && '$value' in val && '$type' in val) {
      let resolved = resolveToken(val.$value);
      if (
        val.$type === 'color' &&
        resolved &&
        typeof resolved === 'object' &&
        'hex' in resolved
      ) {
        resolved = resolved.hex;
      }
      output[fullKey] = {
        type: val.$type,
        value: val.$value,
        description: val.description,
        resolvedValue: resolved,
      };
    } else if (val && typeof val === 'object') {
      flattenStructuredTokens(val, output, fullKey);
    }
  }
}

function resolveToken(value: any, seen = new Set<string>()): any {
  if (
    typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    // resolve references, stripping "design-tokens." if present
    let refPath = value
      .slice(1, -1)
      .trim()
      .replace(/^design-tokens\./, '');
    const parts = refPath.split('.');
    let node: any = tokens;
    for (const part of parts) {
      if (node && typeof node === 'object' && part in node) {
        node = node[part];
      } else {
        return value;
      }
    }
    if ('$value' in node) {
      return resolveToken(node.$value, seen);
    }
    return node;
  }
  return value;
}
