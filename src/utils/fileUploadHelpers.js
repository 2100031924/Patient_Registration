export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const kilobyte = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(kilobyte)),
    sizes.length - 1
  );

  return `${parseFloat((bytes / Math.pow(kilobyte, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`;
}

export function buildUploadItem({ file, prefix, maxSizeMB }) {
  const sizeMB = file.size / (1024 * 1024);

  if (sizeMB > maxSizeMB) {
    return {
      error: `File "${file.name}" exceeds the ${maxSizeMB}MB limit.`,
    };
  }

  const extensionIndex = file.name.lastIndexOf(".");
  const hasExtension = extensionIndex > 0;

  return {
    item: {
      id: `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      file,
      name: hasExtension ? file.name.substring(0, extensionIndex) : file.name,
      size: formatFileSize(file.size),
      type: (hasExtension ? file.name.substring(extensionIndex + 1) : file.type || "FILE").toUpperCase(),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      progress: 0,
      status: "uploading",
    },
  };
}

export function renameUploadItem(items, id, nextName) {
  return items.map((item) => (item.id === id ? { ...item, name: nextName } : item));
}

export function removeUploadItem(items, id) {
  return items.filter((item) => item.id !== id);
}

export function updateUploadItem(items, id, updater) {
  return items.map((item) => (item.id === id ? { ...item, ...updater(item) } : item));
}