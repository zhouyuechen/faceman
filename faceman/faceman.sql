SET NAMES UTF8;
 DROP DATABASE IF EXISTS fm;
CREATE DATABASE fm CHARSET=UTF8;

use fm;
# SET FOREIGN_KEY_CHECKS=0;


-- ----------------------------
-- Table structure for `fm_picture`
-- ----------------------------
DROP TABLE IF EXISTS `fm_picture`;
CREATE TABLE `fm_picture` (
  `pid` int(11) NOT NULL auto_increment,
	`ptype` varchar(128) default NULL,
  `title` varchar(128) default NULL,
  `src` varchar(128) default NULL,
  `tips` varchar(128) default NULL,
  `psize` varchar(32) default NULL,
  PRIMARY KEY  (`pid`)
	 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_picture
-- ----------------------------
INSERT INTO `fm_picture` VALUES (1,'jpg','狗','img/dog1.jpg','狗 微笑 凝视','110*120');
INSERT INTO `fm_picture` VALUES (2,'jpg','鸭子','img/duck2.jpg','鸭子 鸭鸭 生无可恋 丧','355*355');
INSERT INTO `fm_picture` VALUES (3,'jpg','鸭子','img/duck3.jpg','鸭子 鸭鸭 生无可恋 丧','240*240');
INSERT INTO `fm_picture` VALUES (4,'jpg','鸭子','img/duck4.jpg','鸭子 鸭鸭 浪 丧','440*440');
INSERT INTO `fm_picture` VALUES (5,'jpg','鸭子','img/duck5.jpg','鸭子 鸭鸭 去你 妈的 丧','400*300');
INSERT INTO `fm_picture` VALUES (6,'jpg','鸭子','img/duck6.jpg','鸭子 鸭鸭 去你 妈的 马','783*669');
INSERT INTO `fm_picture` VALUES (7,'jpg','鸭子','img/duck7.jpg','鸭子 鸭鸭 做','194*198');
INSERT INTO `fm_picture` VALUES (8,'jpg','鸭子','img/duck8.jpg','鸭子 鸭鸭 做 鸡','355*355');
INSERT INTO `fm_picture` VALUES (9,'jpg','假笑男孩','img/fakeface1.jpg','假笑 微笑 ','440*402');
INSERT INTO `fm_picture` VALUES (10,'jpg','滑稽','img/huaji.jpg','滑稽 微笑 凝视','198*198');
INSERT INTO `fm_picture` VALUES (11,'jpg','anderson','img/anderson.jpg','nba NBA ','110*120');
INSERT INTO `fm_picture` VALUES (12,'jpg','黄蜂','img/huangfeng.jpg','nba NBA','355*355');
INSERT INTO `fm_picture` VALUES (13,'jpg','詹姆斯','img/james0.jpg','nba NBA 詹姆斯 james','240*240');
INSERT INTO `fm_picture` VALUES (14,'jpg','哈登','img/harden0.jpg','nba NBA 詹姆斯 哈登 james harden','440*440');
INSERT INTO `fm_picture` VALUES (15,'jpg','kd','img/kd.jpg','kd 杜兰特 nba NBA','400*300');
INSERT INTO `fm_picture` VALUES (16,'jpg','厉害','img/lihai.jpg','厉害','783*669');
INSERT INTO `fm_picture` VALUES (17,'jpg','门罗','img/menron.jpg',' 门罗 nba NBA','194*198');
INSERT INTO `fm_picture` VALUES (18,'png','帕克','img/park.png','帕克 park nba NBA','355*355');
INSERT INTO `fm_picture` VALUES (19,'jpg','罗斯','img/rose0.jpg','罗斯 rose nba NBA ','440*402');
INSERT INTO `fm_picture` VALUES (20,'gif','吴亦凡','img/wyf1.gif','skr wyf 吴亦凡','198*198');
INSERT INTO `fm_picture` VALUES (21,'gif','鸭子','img/rushdark.gif','鸭子 鸭鸭 去你 ','440*440');
INSERT INTO `fm_picture` VALUES (22,'gif','鸭子','img/skydark.gif','鸭子 鸭鸭 去你','440*385');






-- ----------------------------
-- Table structure for fm_user`
-- ----------------------------
DROP TABLE IF EXISTS `fm_user`;
CREATE TABLE `fm_user` (
  `uid` int(11) NOT NULL auto_increment,
  `uname` varchar(32) default NULL,
  `upwd` varchar(32) default NULL,
  `email` varchar(64) default NULL,
  `phone` varchar(16) default NULL,
  `avatar` varchar(128) default NULL,
  `user_name` varchar(32) default NULL,
  `gender` int(11) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB  CHARSET=utf8;

-- ----------------------------
-- Records of fm_user
-- ----------------------------
INSERT INTO `fm_user` VALUES ('1', 'dingding', '123456', 'ding@qq.com', '13511011000', 'img/avatar/default.png', '丁春秋', '0');
INSERT INTO `fm_user` VALUES ('2', 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '当当喵', '1');
INSERT INTO `fm_user` VALUES ('3', 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1');
INSERT INTO `fm_user` VALUES ('4', 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');
INSERT INTO `fm_user` VALUES ('5', '1111', '111111', '441977193@qq.com', '18357100796', null, null, null);
INSERT INTO `fm_user` VALUES ('6', 'ABCD', '123456', '123@qq.com', '13538894495', null, null, null);
INSERT INTO `fm_user` VALUES ('7', 'mohk', '123456', '11@qq.com', '13512312312', null, null, null);
INSERT INTO `fm_user` VALUES ('8', '121123', 'w13945128995', '491000888@qq.com', '13213389258', null, null, null);
INSERT INTO `fm_user` VALUES ('9', '555555', '5555555', '55555555@163.com', '13400000000', null, null, null);
INSERT INTO `fm_user` VALUES ('10', 'xuyong', '123456', '123456789@qq.com', '15525623622', null, null, null);


-- ----------------------------
-- Table structure for fm_fav`
-- ----------------------------
DROP TABLE IF EXISTS `fm_fav`;
CREATE TABLE `fm_fav` (
  `fid` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL,
  `pic_id` int(11) NOT NULL ,
  PRIMARY KEY  (`fid`),
	 FOREIGN KEY (user_id) REFERENCES fm_user(uid),
	  FOREIGN KEY (pic_id) REFERENCES fm_picture(pid)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_fav
-- ----------------------------