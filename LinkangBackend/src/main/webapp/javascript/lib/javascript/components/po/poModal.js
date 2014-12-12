/**
 * 档期弹窗选择列表
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */


define([
  "{pro}components/po/poSearchList.js",
  "{pro}components/modal/modal.js",
  ], function(PoSearchList, Modal){

  var PoModal = Modal.extend({
    data: {
      title: "选择档期",
      width: 800
    },
    content: "<schedule-select selected={{selected}} startTime={{startTime}} endTime={{endTime}}/>"

    });

  PoModal.component("schedule-select", PoSearchList);

  return PoModal;


})