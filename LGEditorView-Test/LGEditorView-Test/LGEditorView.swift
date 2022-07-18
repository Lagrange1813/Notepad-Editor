//
//  LGEditorView.swift
//  LGEditorView-Test
//
//  Created by 张维熙 on 2022/7/15.
//

import Combine
import WebKit

protocol LGEditorViewDelegate {
	func enableButton(with name: String)
	func disableButton(with name: String)
}

public class LGEditorView: WKWebView {
	var text: String = "" {
		didSet {
			print(text)
		}
	}
	
	let monitorList: [String] = ["enableButton",
	                             "disableButton"]
	
	var delegate: LGEditorViewDelegate?
	
	private var cancelBag = Set<AnyCancellable>()
	
	init() {
		let contentController = WKUserContentController()
		let config = WKWebViewConfiguration()
		config.userContentController = contentController
		config.applicationNameForUserAgent = "Chrome"
		
		super.init(frame: .zero, configuration: config)
		removeInputAccessory()
		
		navigationDelegate = self
		uiDelegate = self
		
		loadResources()
		setMonitorList()
		bindEvent()
	}
	
	@available(*, unavailable)
	required init?(coder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	func bindEvent() {
		let keyboardWillHide = NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)
		
		keyboardWillHide
			.sink { _ in
				self.evaluateJavaScript("editor.hook.blur();")
			}
			.store(in: &cancelBag)
	}
	
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
	
	func setMonitorList() {
		for name in monitorList {
			configuration.userContentController.add(self, name: name)
		}
	}
}

private final class InputAccessoryHideHelper: NSObject {
	@objc var inputAccessoryView: AnyObject? { return nil }
}

extension WKWebView {
	func removeInputAccessory() {
		guard let target = scrollView.subviews.first(where: {
			String(describing: type(of: $0)).hasPrefix("WKContent")
		}), let superclass = target.superclass else {
			return
		}

		let noInputAccessoryViewClassName = "\(superclass)_NoInputAccessoryView"
		var newClass: AnyClass? = NSClassFromString(noInputAccessoryViewClassName)

		if newClass == nil, let targetClass = object_getClass(target), let classNameCString = noInputAccessoryViewClassName.cString(using: .ascii) {
			newClass = objc_allocateClassPair(targetClass, classNameCString, 0)

			if let newClass = newClass {
				objc_registerClassPair(newClass)
			}
		}

		guard let noInputAccessoryClass = newClass, let originalMethod = class_getInstanceMethod(InputAccessoryHideHelper.self, #selector(getter: InputAccessoryHideHelper.inputAccessoryView)) else {
			return
		}
		class_addMethod(noInputAccessoryClass.self, #selector(getter: InputAccessoryHideHelper.inputAccessoryView), method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod))
		object_setClass(target, noInputAccessoryClass)
	}
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
		print("handleScript")
		if message.name == "enableButton" {
			guard let name = message.body as? String else { return }
			delegate?.enableButton(with: name)
		}
		
		if message.name == "disableButton" {
			guard let name = message.body as? String else { return }
			delegate?.disableButton(with: name)
		}
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
}

extension LGEditorView {
	func TestFunction() {
		evaluateJavaScript("editor.hook.insertTable();")
	}
}
