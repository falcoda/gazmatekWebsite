const RAW_DISPLAY_SAFE_PATTERN =
  /^[\p{L}\p{N}\s"'`\u2019&.,:;!?()\-+/]*$/u;

export const canUseRawDisplayFont = (value: string): boolean =>
  RAW_DISPLAY_SAFE_PATTERN.test(value.normalize("NFC"));
