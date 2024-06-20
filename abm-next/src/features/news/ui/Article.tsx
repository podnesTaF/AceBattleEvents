"use client";

import { INews } from "@/src/entities/News";
import { TextContent } from "@/src/shared/ui";
import Image from "next/image";
import React from "react";

export const Article = ({ article }: { article: INews }) => {
  return (
    <div className="flex flex-col w-full gap-6 mb-6">
      {article.contents.map((item) => (
        <React.Fragment key={item.id}>
          {item.text ? (
            <TextContent text={item.text} />
          ) : (
            item.type === "media" && (
              <Image
                src={item.mediaUrl || "/new-dummy-img.jpg"}
                alt={article.title}
                width={400}
                height={200}
                className="p-4 md:w-auto"
              />
            )
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Article;
