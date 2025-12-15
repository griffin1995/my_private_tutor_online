'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'motion/react';
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
    <motion.section
      className="py-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <motion.p
            className="mb-16 max-w-4xl px-8 font-medium lg:text-3xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
            &ldquo;{quote}&rdquo;
          </motion.p>
          <motion.div
            className="flex items-center gap-2 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}>
              <Avatar className="size-12 md:size-16">
                <AvatarImage src={author.avatar.src} alt={author.avatar.alt} />
                <AvatarFallback>{author.name}</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div
              className="text-left border-l-2 border-border pl-3 md:pl-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}>
              <p className="text-sm font-medium md:text-base mb-0">{author.name}</p>
              <p className="text-muted-foreground text-sm md:text-base mb-0">
                {author.role}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export { TestimonialAuthorRole };
