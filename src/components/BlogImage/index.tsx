import { LazyLoadImage } from "react-lazy-load-image-component"

type TBlogImage = {
  src: string
  alt: string
}

const BlogImage = ({ src, alt }: TBlogImage) => {
  return (
    <div className="flex justify-center">
      <div>
        <LazyLoadImage src={src} alt={alt} />
        <span className="text-xs block text-gray-400 text-center mt-2">
          {alt}
        </span>
      </div>
    </div>
  )
}

export default BlogImage
