package com.linkang.platform.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class LoginController extends BaseController {

	/**
	 * 首页.<br/>
	 * ftl 获取已登录用户真实姓名<#if RequestParameters["realName"]?exists>
	 * ${RequestParameters["realName"]}
	 * 
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
