//
//  ViewController.swift
//  LGEditorView-Test
//
//  Created by 张维熙 on 2022/7/15.
//

import SnapKit
import UIKit

class ViewController: UIViewController {
	let editorView = EditorViewController()
	
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
		
		editorView.view.setNeedsLayout()
	}
	
	@objc func showView() {
		navigationController?.pushViewController(editorView, animated: true)
	}
}

class EditorViewController: UIViewController {
	let editor = LGEditorView()
	
	override func viewDidLoad() {
		super.viewDidLoad()
		view.backgroundColor = .white
		layoutEditorView()
	}
	
	func layoutEditorView() {
		view.addSubview(editor)
		
		editor.snp.makeConstraints { make in
			make.top.equalTo(view.safeAreaLayoutGuide.snp.top)
			make.leading.equalTo(view.safeAreaLayoutGuide.snp.leading)
			make.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom)
			make.trailing.equalTo(view.safeAreaLayoutGuide.snp.trailing)
		}
	}
}
