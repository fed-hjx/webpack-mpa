/**
 * @author huangjiaxiang
 * @createTime 2017-07-17 09:30
 * @description 消息推送 公共模块
 * @example :
 * 	let socket = require('~/service/socket'); 
 *	socket.connect('getPushDrawResult',function(data){
 *  	console.log(data)
 *	})
 * npm: "socket.io-client": "^2.0.3",
 */

const ip = location.host == '192.168.74.175'? '192.168.74.173' : (location.host == '192.168.74.169')?'192.168.74.166':'ts.2ncai.com';
// const ip = '192.168.69.33';
const socket = require('socket.io-client')(`ws://${ip}:9092/`);
socket.on('connect', function(){
	console.log('socket connect success!')
});
module.exports = {
	connect(m,callback){
		socket.on(m, function(data) {//转码兼容ie8
			// console.log(JSON.parse(decodeURIComponent(data)))
			callback && callback(JSON.parse(decodeURIComponent(data)));
		});
	},
	disconnect(callback){
		socket.on('disconnect', function(){
			callback && callback();
		});
		socket.disconnect();
	}
}