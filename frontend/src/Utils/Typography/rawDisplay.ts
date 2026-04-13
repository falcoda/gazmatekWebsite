const RAW_DISPLAY_SAFE_PATTERN = /^[A-Za-z\s"'`\u2019&.,:;!?()\-+/]*$/;

export const canUseRawDisplayFont = (value: string): boolean =>
  RAW_DISPLAY_SAFE_PATTERN.test(value.normalize("NFC"));
