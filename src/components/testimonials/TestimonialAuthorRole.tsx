'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BodyText, CaptionText } from '@/components/ui/typography';
import type { ReactNode } from "react";

interface TestimonialAuthorRoleProps {
  quote?: ReactNode;
  author?: {
    name: string;
    role: string;
    avatar: {
      src: string;
      alt: string;
    };
  };
}

const TestimonialAuthorRole = ({
  quote = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  author = {
    name: "Customer Name",
    role: "Role",
    avatar: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      alt: "Customer Name",
    },
  },
}: TestimonialAuthorRoleProps) => {

  return (
    <section
      className="py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <blockquote
            className="mb-16 max-w-4xl px-8 font-medium text-semantic-body-large lg:text-semantic-heading-responsive"
            viewport={{ once: true, margin: '-50px' }}
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div
            className="flex items-center gap-2 md:gap-4"
            viewport={{ once: true, margin: '-50px' }}
            <div
              viewport={{ once: true, margin: '-50px' }}
              <Avatar className="size-12 md:size-16">
                <AvatarImage src={author.avatar.src} alt={author.avatar.alt} />
                <AvatarFallback>{author.name}</AvatarFallback>
              </Avatar>
            </div>
            <div
              className="text-left border-l-2 border-border pl-3 md:pl-4"
              viewport={{ once: true, margin: '-50px' }}
              <cite className="font-medium text-semantic-caption-default md:text-semantic-caption-responsive mb-0 not-italic block">{author.name}</cite>
              <CaptionText
                variant="default"
                className="text-muted-foreground mb-0"
                responsive>
                {author.role}
              </CaptionText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialAuthorRole };
