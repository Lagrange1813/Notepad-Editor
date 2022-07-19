export const setCurrentButtons = (names: string[]) => {
  (window as any).webkit.messageHandlers.setCurrentButton.postMessage(names);
}

export const removeCurrentButtons = (names: string[]) => {
  (window as any).webkit.messageHandlers.removeCurrentButton.postMessage(names);
}

export const enableBarButtons = (names: string[]) => {
  (window as any).webkit.messageHandlers.enableBarButtons.postMessage(names);
}

export const disableBarButtons = (names: string[]) => {
  (window as any).webkit.messageHandlers.disableBarButtons.postMessage(names);
}
