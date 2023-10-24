const TextContent = ({ text }: { text: string }) => {
  const textWithSemiBold = text.replace(
    /<bt>(.*?)<\/bt>/g,
    '<div class="font-semibold mb-2">$1</div>'
  );

  // Replace <cite> tags with the appropriate styles
  const textWithItalic = textWithSemiBold.replace(
    /<cite>(.*?)<\/cite>/g,
    '<div class="italic pl-4 mb-2">$1</div>'
  );

  // Replace <b> tags with the appropriate styles
  const textWithBold = textWithItalic.replace(
    /<b>(.*?)<\/b>/g,
    '<b class="font-semibold">$1</b>'
  );
  return <div dangerouslySetInnerHTML={{ __html: textWithBold }} />;
};

export default TextContent;
