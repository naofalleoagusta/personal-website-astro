import formatDate from "../../helpers/formatDate";

import type { BlogPostType } from "../../types";

type BlogCardProps = {
  blog: BlogPostType;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <a
      className="w-full rounded-lg text-white relative h-[320px] group hover:scale-110 hover:z-20 transition-all duration-500 p-1 hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-500 hover:to-purple-600"
      href={`/post/${blog.slug}`}
    >
      <div
        className="h-full w-full top-0 left-0 rounded-md"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/${blog.ogImage}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />

      <time dateTime={blog.date} className="absolute top-4 right-4 text-sm">
        {formatDate(blog.date, true)}
      </time>
      <div className="absolute px-4 pt-4 w-full bottom-4">
        <div className="flex items-center text-xs mb-2">
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-[5px]"
          >
            <g>
              <path d="M0 0h24v24H0z" className="fill-none"></path>
              <path
                className="fill-white "
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
              ></path>
            </g>
          </svg>
          <span>{blog.readingTime} read</span>
        </div>
        <h2 className="text-lg font-bold truncate mb-2">{blog.title}</h2>
        <p className="h-[40px] max-h-[40px] text-sm overflow-hidden">
          {blog.description}
        </p>
      </div>
    </a>
  );
};

export default BlogCard;
