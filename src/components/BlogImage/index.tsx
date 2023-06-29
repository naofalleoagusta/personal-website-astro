type TBlogImage = {
  src: string
  alt: string
}

const BlogImage = ({ src, alt }: TBlogImage) => {
  return (
    <div className="flex justify-center">
      <div>
        <img src={src} alt={alt} />
        <span className="text-xs block text-gray-400 text-center mt-2">
          {alt}
        </span>
      </div>
    </div>
  )
}

export default BlogImage
