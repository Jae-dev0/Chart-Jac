import CommentEditor from "@/components/activity/comment-editor";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <CommentEditor
      value={content}
      readOnly
      showBubbleMenu={false}
      proseClassName="jac-chart-tiptap-prose"
      contentClassName="jac-chart-tiptap-content"
      className="[&_.jac-chart-tiptap-content_.ProseMirror]:max-h-none [&_.jac-chart-tiptap-content_.ProseMirror]:overflow-visible [&_.jac-chart-tiptap-content_.ProseMirror]:px-0 [&_.jac-chart-tiptap-content_.ProseMirror]:py-0"
    />
  );
}
