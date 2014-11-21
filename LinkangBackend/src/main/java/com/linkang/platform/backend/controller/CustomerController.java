package com.linkang.platform.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.linkang.platform.backend.meta.LkMemberUserProfile;
import com.linkang.platform.backend.service.CustomerService;

@Controller
@RequestMapping("customer")
public class CustomerController extends BaseController {
	
//	@Autowired
	private CustomerService customerService;
	
	/**
	 * @param model
	 * @return
	 */
	@RequestMapping("/index")
	public String index(Model model) {
		// 用户名
		model.addAttribute("userName", '1');
		LkMemberUserProfile profile = new LkMemberUserProfile(1L, 1L, "111");
		customerService.saveCustomer(profile);
		return "index";
	}
}
