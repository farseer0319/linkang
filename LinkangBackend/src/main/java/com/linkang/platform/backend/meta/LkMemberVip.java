package com.linkang.platform.backend.meta;
// Generated 2014-11-20 18:17:03 by Hibernate Tools 3.2.2.GA


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * LkMemberVip generated by hbm2java
 */
@Entity
@Table(name="LK_Member_VIP"
    ,catalog="lk"
)
public class LkMemberVip  implements java.io.Serializable {


     private long id;
     private long userId;
     private long vipId;
     private Long startTime;
     private Long endTime;
     private String comment;

    public LkMemberVip() {
    }

	
    public LkMemberVip(long id, long userId, long vipId) {
        this.id = id;
        this.userId = userId;
        this.vipId = vipId;
    }
    public LkMemberVip(long id, long userId, long vipId, Long startTime, Long endTime, String comment) {
       this.id = id;
       this.userId = userId;
       this.vipId = vipId;
       this.startTime = startTime;
       this.endTime = endTime;
       this.comment = comment;
    }
   
     @Id 
    
    @Column(name="Id", unique=true, nullable=false)
    public long getId() {
        return this.id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    @Column(name="UserId", nullable=false)
    public long getUserId() {
        return this.userId;
    }
    
    public void setUserId(long userId) {
        this.userId = userId;
    }
    
    @Column(name="VipId", nullable=false)
    public long getVipId() {
        return this.vipId;
    }
    
    public void setVipId(long vipId) {
        this.vipId = vipId;
    }
    
    @Column(name="StartTime")
    public Long getStartTime() {
        return this.startTime;
    }
    
    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }
    
    @Column(name="EndTime")
    public Long getEndTime() {
        return this.endTime;
    }
    
    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }
    
    @Column(name="Comment", length=256)
    public String getComment() {
        return this.comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }




}


