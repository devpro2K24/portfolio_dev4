import React from "react";
import { Compare } from "./ui/compare";

export function CompareDemo() {
  return (
    <div className="border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
      <Compare
        firstImage="https://assets.aceternity.com/code-problem.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[600px] md:h-[500px] md:w-[500px] object-cover"
        slideMode="hover"
      />
    </div>
  );
}
