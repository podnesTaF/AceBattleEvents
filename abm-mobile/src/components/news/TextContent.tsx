import { Text } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

const parseHTML = (htmlString: string) => {
  const regex =
    /<cite>(.*?)<\/cite>|<b>(.*?)<\/b>|<bt>(.*?)<\/bt>|<br\/>|<br \/>/g;
  let match;
  let lastIndex = 0;
  const elements = [];

  while ((match = regex.exec(htmlString)) !== null) {
    if (match.index > lastIndex) {
      elements.push({
        type: "text",
        content: htmlString.substring(lastIndex, match.index),
      });
    }

    if (match[0].startsWith("<cite>")) {
      elements.push({ type: "cite", content: match[1] });
    } else if (match[0].startsWith("<b>")) {
      elements.push({ type: "b", content: match[2] });
    } else if (match[0].startsWith("<bt>")) {
      elements.push({ type: "bt", content: match[3] });
    } else if (match[0].startsWith("<br/>") || match[0].startsWith("<br />")) {
      elements.push({ type: "br" });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < htmlString.length) {
    elements.push({ type: "text", content: htmlString.substring(lastIndex) });
  }

  return elements;
};

const TextContent = ({ text }: { text?: string }) => {
  if (!text) {
    return null;
  }
  const elements = parseHTML(text);

  return (
    <View>
      {elements.map((el, index) => {
        switch (el.type) {
          case "text":
            return <Text key={index}>{el.content}</Text>;
          case "cite":
            return (
              <Text key={index} style={styles.cite}>
                {el.content}
              </Text>
            );
          case "b":
            return (
              <Text key={index} style={styles.bold}>
                {el.content}
              </Text>
            );
          case "bt":
            return (
              <Text key={index} style={styles.boldMargin}>
                {el.content}
              </Text>
            );
          case "br":
            return <Text key={index} lineHeight={8}></Text>;
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cite: {
    fontStyle: "italic",
    paddingLeft: 8,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  boldMargin: {
    fontWeight: "bold",
    marginBottom: 2,
  },
});

export default TextContent;
