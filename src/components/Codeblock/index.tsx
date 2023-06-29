import { useState } from "react"
import DOMPurify from "isomorphic-dompurify"

type TCodeBlock = {
  text: string
  pathname?: string
  isPreline?: boolean
  copyableText?: string
}

const Codeblock = ({
  text,
  pathname,
  isPreline = true,
  copyableText,
}: TCodeBlock) => {
  const [isCopied, setIsCopied] = useState(false)
  const handleOnClick = () => {
    navigator.clipboard.writeText(copyableText || text).then(
      () => {
        console.log("Content copied to clipboard")
        setIsCopied(true)
      },
      () => {
        console.error("Failed to copy")
      },
    )
    setTimeout(() => setIsCopied(false), 1000)
  }
  const clean = DOMPurify.sanitize(text)
  return (
    <div className="max-w-xl mx-auto w-full rounded-lg overflow-hidden relative group">
      {pathname && (
        <div className="px-3 py-1 w-full bg-slate-400 dark:bg-slate-900 text-slate-700 dark:text-gray-200 text-xs">
          {pathname}
        </div>
      )}
      <pre
        className={`${
          isPreline ? "whitespace-pre-line" : ""
        } overflow-auto flex items-center w-ful bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-gray-200 p-3 text-sm`}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
      <button
        onClick={handleOnClick}
        className={`${
          pathname ? "top-8" : "top-[0.65rem]"
        } group-hover:opacity-100 opacity-0 transition-all border bg-gray-100 border-gray-400 rounded absolute right-2 w-6 h-6 flex items-center justify-center`}
      >
        <img
          src={`/copy.svg`}
          className={`w-4 h-4 absolute ${
            isCopied ? "opacity-0" : "opacity-100"
          } transition-all`}
        />
        <img
          src={`/check.svg`}
          className={`w-4 h-4 absolute ${
            isCopied ? "opacity-100" : "opacity-0"
          } transition-all`}
        />
      </button>
    </div>
  )
}

export default Codeblock
