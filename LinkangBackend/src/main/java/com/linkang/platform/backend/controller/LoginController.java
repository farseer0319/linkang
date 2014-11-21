package com.linkang.platform.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class LoginController extends BaseController {

	/**
	 * @param model
	 * @return
	 */
	@RequestMapping("/index")
	public String index(Model model) {
		// 用户名
		model.addAttribute("userName", '1');
		// 左边导航树
		// List<AgentRank> naveTree = agentRankService.getLeftNavTreeOfAgent();
		// model.addAttribute("navTree", naveTree);
		// 打开index.ftl
		return "index";
	}
	
}
