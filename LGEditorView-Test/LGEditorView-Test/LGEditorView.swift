//
//  LGEditorView.swift
//  LGEditorView-Test
//
//  Created by 张维熙 on 2022/7/15.
//

import WebKit

public class LGEditorView: WKWebView {
//	let list: [String] = ["getText"]
	
	var text: String = "" {
		didSet {
			print(text)
		}
	}
	
	init() {
		let contentController = WKUserContentController()
		let config = WKWebViewConfiguration()
		config.userContentController = contentController
		config.applicationNameForUserAgent = "Chrome"
		
		super.init(frame: .zero, configuration: config)
		navigationDelegate = self
		uiDelegate = self
		
		loadResources()
//		setMonitorList()
	}
	
	@available(*, unavailable)
	required init?(coder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	func setBarItem() {}
	
	func loadResources() {
		if let path = Bundle.main.path(forResource: "demo/Editor", ofType: "html") {
			print(path)
//			let request = URLRequest(url: URL(fileURLWithPath: path))
//			load(request)
			loadFileURL(URL(fileURLWithPath: path), allowingReadAccessTo: URL(fileURLWithPath: path))
		} else {
			fatalError("Fail to load resources")
		}
	}
	
//	func setMonitorList() {
//		for name in list {
//			configuration.userContentController.add(self, name: name)
//		}
//	}
}

extension LGEditorView: WKNavigationDelegate {
	public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
//		setLGEditorMode(.sv)
//		getText()
	}
}

extension LGEditorView: WKUIDelegate {}

extension LGEditorView: WKScriptMessageHandler {
	public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
//		if message.name == "getText" {
//			let text = message.body as? String ?? ""
//			self.text = text
//		}
	}
}

// MARK: - Hooks

extension LGEditorView {
	enum LGEditorMode: String {
		case ir
		case sv
	}
	
	func setLGEditorMode(_ mode: LGEditorMode) {
		evaluateJavaScript("editor.hook.setEditorMode('\(mode)');")
	}
	
	func getText() {
		evaluateJavaScript("editor.hook.getText();", completionHandler: {
			text, _ in
			guard let text = text else { return }
			print(text)
		})
	}
	
	override public func resignFirstResponder() -> Bool {
		evaluateJavaScript("editor.hook.blur();")
		return super.resignFirstResponder()
	}
	
}
