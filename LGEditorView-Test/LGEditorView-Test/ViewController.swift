//
//  ViewController.swift
//  LGEditorView-Test
//
//  Created by 张维熙 on 2022/7/15.
//

import SnapKit
import UIKit

class ViewController: UIViewController {
	let textVC = TextViewController()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		view.backgroundColor = .white
		
		let button = UIButton()
		button.setTitle("Show", for: .normal)
		button.setTitleColor(.black, for: .normal)
		button.setTitleColor(.systemGray, for: .highlighted)
		
		button.addTarget(self, action: #selector(showView), for: .touchUpInside)
		
		view.addSubview(button)
		
		button.snp.makeConstraints { make in
			make.center.equalToSuperview()
			make.width.equalTo(70)
			make.height.equalTo(70)
		}
	}
	
	@objc func showView() {
		navigationController?.pushViewController(textVC, animated: true)
	}
}

class TextViewController: UIViewController {
	let textView = MDTextView()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		view.backgroundColor = .white
		layoutTextView()
		configureTextView()
		setBarItem()
	}
	
//	override func viewWillAppear(_ animated: Bool) {
//		super.viewWillAppear(animated)
//		textView.updateHeight()
//	}
	
	override func viewDidAppear(_ animated: Bool) {
		super.viewDidAppear(animated)
		textView.updateHeight()
	}
	
	func layoutTextView() {
		view.addSubview(textView)
		
		textView.snp.makeConstraints { make in
			make.top.equalTo(view.safeAreaLayoutGuide.snp.top)
			make.leading.equalTo(view.safeAreaLayoutGuide.snp.leading)
			make.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom)
			make.trailing.equalTo(view.safeAreaLayoutGuide.snp.trailing)
		}
	}
	
	func configureTextView() {
		textView.bodyView.delegate = self
	}
	
	func setBarItem() {
		let button = UIBarButtonItem(title: "Test", style: .plain, target: self, action: #selector(bridge))
		navigationItem.rightBarButtonItem = button
	}
	
	@objc func bridge() {
		textView.bodyView.TestFunction()
	}
}

extension TextViewController: LGEditorViewDelegate {
	func setCurrentButton(with names: [String]) {}
	
	func removeCurrentButton(with names: [String]) {}

	func enableBarButtons(with names: [String]) {
		if names.contains("table") {
			navigationItem.rightBarButtonItem?.isEnabled = true
		}
	}
	
	func disableBarButtons(with names: [String]) {
		if names.contains("table") {
			navigationItem.rightBarButtonItem?.isEnabled = false
		}
	}
}

class MDTextView: UIScrollView {
	let titleView = UITextView()
	let bodyView = LGEditorView()
	
	init() {
		super.init(frame: .zero)
		customize()
	}
	
	required init?(coder: NSCoder) {
		super.init(coder: coder)
	}
	
	func customize() {
		layoutTextView()
		configureTextView()
	}
	
	func layoutTextView() {
		titleView.isScrollEnabled = false
		titleView.backgroundColor = .clear
		titleView.sizeToFit()
		addSubview(titleView)
		
		titleView.snp.makeConstraints { make in
			make.top.equalToSuperview().offset(12)
			make.centerX.equalToSuperview()
			make.width.equalTo(300)
			make.height.equalTo(50)
		}
		
		bodyView.scrollView.bounces = false
		bodyView.scrollView.isScrollEnabled = false
		bodyView.backgroundColor = .clear
		addSubview(bodyView)
		
		bodyView.snp.makeConstraints { make in
			make.top.equalTo(titleView.snp.bottom)
			make.centerX.equalToSuperview()
			make.width.equalTo(350)
			make.height.equalTo(0)
		}
	}
	
	func configureTextView() {
		titleView.selectedRange = NSRange(location: 0, length: 0)
		titleView.autocorrectionType = .no
		titleView.text = "Test"
		
		bodyView.getViewHeight = { [unowned self] in
			bodyView.frame.height
		}

		bodyView.updateHeight = { [unowned self] height in
			bodyView.snp.updateConstraints { make in
				make.height.equalTo(height)
			}
			layoutIfNeeded()
			updateContentSize(with: height)
		}
	}
	
	func updateContentSize(with height: CGFloat) {
		contentSize = CGSize(width: frame.width,
												 height: height + titleView.frame.height)
	}
	
	func updateHeight() {
		bodyView.evaluateJavaScript("editor.hook.syncHeight();")
	}
}
