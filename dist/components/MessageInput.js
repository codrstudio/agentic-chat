import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState, useCallback } from "react";
import { Send, Square, Plus, Mic, X, Camera, Paperclip, Image as ImageIcon, CircleStop, Loader2 } from "lucide-react";
import { Button } from "../ui/button.js";
import { cn } from "../lib/utils.js";
// ── Constants ──
const LINE_HEIGHT_PX = 24;
const MAX_ROWS = 10;
const MULTILINE_THRESHOLD_PX = LINE_HEIGHT_PX * 1.5; // 36px — above this = multiline
// ── Recording Hook ──
function useAudioRecording(onComplete) {
    const [isRecording, setIsRecording] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef();
    const start = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0)
                chunksRef.current.push(e.data); };
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const file = new File([blob], `audio-${Date.now()}.webm`, { type: "audio/webm" });
                stream.getTracks().forEach((t) => t.stop());
                onComplete(file);
            };
            recorder.start();
            setIsRecording(true);
            setElapsed(0);
            timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
        }
        catch { /* permission denied */ }
    }, [onComplete]);
    const stop = useCallback(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        clearInterval(timerRef.current);
    }, []);
    const cancel = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.onstop = null;
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
        }
        setIsRecording(false);
        setElapsed(0);
        clearInterval(timerRef.current);
    }, []);
    useEffect(() => () => clearInterval(timerRef.current), []);
    return { isRecording, elapsed, start, stop, cancel };
}
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}
// ── Attachment Preview ──
function AttachmentPreview({ attachment, onRemove }) {
    return (_jsxs("div", { className: "relative group shrink-0", children: [attachment.type === "image" && attachment.preview ? (_jsx("div", { className: "relative h-16 w-16 rounded-lg overflow-hidden border border-border/50", children: _jsx("img", { src: attachment.preview, alt: attachment.file.name, className: "h-full w-full object-cover" }) })) : (_jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2", children: [_jsx(Paperclip, { className: "h-4 w-4 text-muted-foreground shrink-0" }), _jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[120px]", children: attachment.file.name })] })), _jsx("button", { type: "button", onClick: onRemove, className: "absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", "aria-label": "Remover", children: _jsx(X, { className: "h-3 w-3" }) })] }));
}
// ── Plus Menu ──
function PlusMenu({ onFile, onCamera, onGallery, onClose }) {
    const menuRef = useRef(null);
    useEffect(() => {
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target))
                onClose();
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);
    return (_jsx("div", { ref: menuRef, className: "absolute bottom-full left-0 mb-2 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg py-1 min-w-[160px] z-10", children: [
            { icon: Paperclip, label: "Arquivo", onClick: onFile },
            { icon: Camera, label: "Camera", onClick: onCamera },
            { icon: ImageIcon, label: "Galeria", onClick: onGallery },
        ].map((item) => (_jsxs("button", { type: "button", onClick: () => { item.onClick(); onClose(); }, className: "flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors", children: [_jsx(item.icon, { className: "h-4 w-4 text-muted-foreground" }), item.label] }, item.label))) }));
}
// ── Main Component ──
export function MessageInput({ input, setInput, handleSubmit, isLoading, isUploading = false, stop, placeholder = "Caixa de mensagem...", className, enableAttachments = true, enableVoice = true, }) {
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const containerRef = useRef(null);
    const [attachments, setAttachments] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isMultiline, setIsMultiline] = useState(false);
    const historyRef = useRef([]);
    const historyPosRef = useRef(-1);
    const savedInputRef = useRef("");
    const onRecordingComplete = useCallback((file) => {
        const att = { id: crypto.randomUUID(), file, type: "audio" };
        setAttachments((prev) => [...prev, att]);
    }, []);
    const { isRecording, elapsed, start: startRecording, stop: stopRecording, cancel: cancelRecording } = useAudioRecording(onRecordingComplete);
    const hasContent = input.trim().length > 0 || attachments.length > 0;
    // Auto-focus
    useEffect(() => { textareaRef.current?.focus(); }, []);
    // Auto-expand — stable measurement with height:auto
    useEffect(() => {
        const el = textareaRef.current;
        if (!el)
            return;
        el.style.height = "auto";
        const scrollH = el.scrollHeight;
        const maxH = MAX_ROWS * LINE_HEIGHT_PX;
        const clampedH = Math.min(scrollH, maxH);
        el.style.height = `${clampedH}px`;
        setIsMultiline(scrollH > MULTILINE_THRESHOLD_PX);
    }, [input]);
    // ── Attachments ──
    const addFiles = useCallback((files) => {
        const newAttachments = Array.from(files).map((file) => {
            const isImage = file.type.startsWith("image/");
            const att = { id: crypto.randomUUID(), file, type: isImage ? "image" : "file" };
            if (isImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setAttachments((prev) => prev.map((a) => (a.id === att.id ? { ...a, preview: e.target?.result } : a)));
                };
                reader.readAsDataURL(file);
            }
            return att;
        });
        setAttachments((prev) => [...prev, ...newAttachments]);
    }, []);
    const removeAttachment = useCallback((id) => {
        setAttachments((prev) => prev.filter((a) => a.id !== id));
    }, []);
    // ── Drag & Drop ──
    const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
    const handleDragLeave = useCallback((e) => {
        if (containerRef.current && !containerRef.current.contains(e.relatedTarget))
            setIsDragging(false);
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length)
            addFiles(e.dataTransfer.files);
    }, [addFiles]);
    // ── Clipboard Paste ──
    const handlePaste = useCallback((e) => {
        const files = [];
        for (let i = 0; i < e.clipboardData.items.length; i++) {
            if (e.clipboardData.items[i].kind === "file") {
                const file = e.clipboardData.items[i].getAsFile();
                if (file)
                    files.push(file);
            }
        }
        if (files.length) {
            e.preventDefault();
            addFiles(files);
        }
    }, [addFiles]);
    // ── Submit ──
    function onSubmit(e) {
        e.preventDefault();
        if (!hasContent || isLoading)
            return;
        if (input.trim()) {
            historyRef.current.unshift(input);
            if (historyRef.current.length > 50)
                historyRef.current.length = 50;
        }
        historyPosRef.current = -1;
        savedInputRef.current = "";
        handleSubmit(e, attachments.length > 0 ? attachments : undefined);
        setAttachments([]);
    }
    function handleKeyDown(e) {
        // History navigation — only when cursor is at start/end and not multiline content
        const el = textareaRef.current;
        if (e.key === "ArrowUp" && historyRef.current.length > 0 && el) {
            const atTop = el.selectionStart === 0 && el.selectionEnd === 0;
            const isEmpty = input === "";
            if (atTop || isEmpty) {
                e.preventDefault();
                if (historyPosRef.current === -1)
                    savedInputRef.current = input;
                const nextPos = Math.min(historyPosRef.current + 1, historyRef.current.length - 1);
                if (nextPos !== historyPosRef.current) {
                    historyPosRef.current = nextPos;
                    setInput(historyRef.current[nextPos]);
                }
                return;
            }
        }
        if (e.key === "ArrowDown" && historyPosRef.current >= 0 && el) {
            const atBottom = el.selectionStart === input.length;
            if (atBottom) {
                e.preventDefault();
                const nextPos = historyPosRef.current - 1;
                historyPosRef.current = nextPos;
                setInput(nextPos < 0 ? savedInputRef.current : historyRef.current[nextPos]);
                return;
            }
        }
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (hasContent && !isLoading)
                onSubmit(e);
        }
    }
    // ── Render ──
    return (_jsxs("div", { ref: containerRef, onDragOver: enableAttachments ? handleDragOver : undefined, onDragLeave: enableAttachments ? handleDragLeave : undefined, onDrop: enableAttachments ? handleDrop : undefined, className: cn("relative border border-border/50 bg-muted transition-[border-radius] duration-200", isMultiline || attachments.length > 0 ? "rounded-2xl" : "rounded-full", isDragging && "ring-2 ring-primary/50", className), children: [isDragging && (_jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-primary/5 border-2 border-dashed border-primary/30", children: _jsx("span", { className: "text-sm text-primary font-medium", children: "Solte aqui" }) })), isRecording && (_jsxs("div", { className: "flex items-center gap-3 px-3 py-2", children: [_jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: cancelRecording, className: "h-8 w-8 rounded-full shrink-0 text-muted-foreground", "aria-label": "Cancelar", children: _jsx(X, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center gap-2 flex-1", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-red-500 animate-pulse" }), _jsx("span", { className: "text-sm font-medium tabular-nums", children: formatTime(elapsed) }), _jsx("div", { className: "flex-1 flex items-center gap-0.5 px-2", children: Array.from({ length: 20 }, (_, i) => (_jsx("span", { className: "w-1 bg-foreground/30 rounded-full", style: { height: `${4 + Math.random() * 12}px` } }, i))) })] }), _jsx(Button, { type: "button", size: "icon", onClick: stopRecording, className: "h-8 w-8 rounded-full shrink-0", "aria-label": "Parar", children: _jsx(CircleStop, { className: "h-4 w-4" }) })] })), _jsxs("div", { className: cn(isRecording && "hidden"), children: [(attachments.length > 0 || isUploading) && (_jsxs("div", { className: "flex flex-wrap gap-2 px-4 pt-3 pb-1", children: [attachments.map((att) => (_jsx(AttachmentPreview, { attachment: att, onRemove: () => removeAttachment(att.id) }, att.id))), isUploading && (_jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-xs text-muted-foreground", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin shrink-0" }), _jsx("span", { children: "Enviando arquivos..." })] }))] })), _jsxs("div", { className: cn("flex gap-1 p-1.5", isMultiline ? "items-end" : "items-center"), children: [enableAttachments && (_jsxs("div", { className: "relative shrink-0", children: [_jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", onClick: () => setShowMenu(!showMenu), "aria-label": "Adicionar", children: _jsx(Plus, { className: "h-4 w-4" }) }), showMenu && (_jsx(PlusMenu, { onFile: () => fileInputRef.current?.click(), onCamera: () => imageInputRef.current?.click(), onGallery: () => imageInputRef.current?.click(), onClose: () => setShowMenu(false) }))] })), _jsx("textarea", { ref: textareaRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, onPaste: enableAttachments ? handlePaste : undefined, placeholder: placeholder, rows: 1, disabled: isLoading, "aria-label": "Mensagem", className: "flex-1 min-w-0 bg-transparent text-foreground text-sm resize-none outline-none placeholder:text-muted-foreground leading-6 py-1 px-2" }), _jsxs("div", { className: "flex items-center gap-0.5 shrink-0", children: [enableVoice && !hasContent && (_jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full text-muted-foreground", onClick: startRecording, "aria-label": "Gravar audio", children: _jsx(Mic, { className: "h-4 w-4" }) })), isLoading && stop ? (_jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: stop, className: "h-8 w-8 rounded-full", "aria-label": "Parar gera\u00E7\u00E3o", children: _jsx(Square, { className: "h-4 w-4" }) })) : (_jsx(Button, { type: "button", size: "icon", onClick: onSubmit, disabled: !hasContent || !!isLoading, className: "h-8 w-8 rounded-full", "aria-label": "Enviar mensagem", children: _jsx(Send, { className: "h-4 w-4" }) }))] })] })] }), _jsx("input", { ref: fileInputRef, type: "file", multiple: true, className: "hidden", onChange: (e) => { if (e.target.files)
                    addFiles(e.target.files); e.target.value = ""; } }), _jsx("input", { ref: imageInputRef, type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: (e) => { if (e.target.files)
                    addFiles(e.target.files); e.target.value = ""; } })] }));
}
