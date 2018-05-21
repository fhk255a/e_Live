-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 05 月 17 日 05:57
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `e_life`
--

-- --------------------------------------------------------

--
-- 表的结构 `myorder`
--

CREATE TABLE IF NOT EXISTS `myorder` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` varchar(100) NOT NULL COMMENT '图片地址',
  `name` varchar(50) NOT NULL COMMENT '商品名称',
  `type` varchar(100) NOT NULL COMMENT '商品套餐',
  `time` varchar(100) NOT NULL COMMENT '商品使用的有效时间',
  `total` int(50) NOT NULL DEFAULT '0' COMMENT '商品总价',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '商品状态1:待评价，2：待付款，3：已消费，4：待使用，5：退款成功',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 COMMENT='我的订单' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `myorder`
--

INSERT INTO `myorder` (`id`, `img`, `name`, `type`, `time`, `total`, `state`) VALUES
(1, '../../public/images/myOreder/img1.jpg', '骚皮KTV', '1间，豪华套房', '2017-10-21 至 22', 108, 3),
(2, '../../public/images/myOreder/img1.jpg', '骚皮KTV', '1间，豪华套房', '2017-10-21 至 22', 108, 2),
(3, '../../public/images/myOreder/img1.jpg', '肯德基', '1间，豪华套房', '2017-10-21 至 22', 108, 3),
(4, '../../public/images/myOreder/img1.jpg', '景湾公寓', '1间，豪华套房', '2017-10-21 至 22', 108, 4),
(5, '../../public/images/myOreder/img1.jpg', '景湾公寓', '1间，豪华套房', '2017-10-21 至 22', 108, 5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
