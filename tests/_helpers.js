/**
 * Recursively removes all comment nodes (`<!-- … -->`) from `root`.
 * @param root  HTMLElement or DocumentFragment whose subtree will be cleaned.
 */
export function stripCommentNodes(root) {
  // A TreeWalker lets us visit only comment nodes and nothing else.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null)

  const comments = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    comments.push(node)
  }
  comments.forEach((c) => c.parentNode?.removeChild(c))

  return root
}
