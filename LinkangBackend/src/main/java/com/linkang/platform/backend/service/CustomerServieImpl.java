package com.linkang.platform.backend.service;

import java.util.List;

import com.linkang.platform.backend.meta.LkMemberUserProfile;
import com.linkang.platform.backend.meta.LkMemberUserProfileHome;

public class CustomerServieImpl implements CustomerService {

	public LkMemberUserProfile saveCustomer(LkMemberUserProfile profile) {
		LkMemberUserProfile profile2 = new LkMemberUserProfile(1L,1L,"11");
		LkMemberUserProfileHome dao = new LkMemberUserProfileHome();
		dao.persist(profile2);
		return profile2;
	}

	public boolean deleteCustomer(LkMemberUserProfile profile) {
		// TODO Auto-generated method stub
		return false;
	}

	public LkMemberUserProfile updateCustomer(LkMemberUserProfile profile) {
		// TODO Auto-generated method stub
		return null;
	}

	public LkMemberUserProfile getCustomerById(Long customerId) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<LkMemberUserProfile> getCustomerList() {
		// TODO Auto-generated method stub
		return null;
	}

}
