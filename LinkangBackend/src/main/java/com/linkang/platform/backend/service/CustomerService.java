package com.linkang.platform.backend.service;

import java.util.List;

import com.linkang.platform.backend.meta.*;

public interface CustomerService {
		public LkMemberUserProfile saveCustomer(LkMemberUserProfile profile);
		public boolean deleteCustomer(LkMemberUserProfile profile);
		public LkMemberUserProfile updateCustomer(LkMemberUserProfile profile);
		public LkMemberUserProfile getCustomerById(Long customerId);
		public List<LkMemberUserProfile> getCustomerList();
}
