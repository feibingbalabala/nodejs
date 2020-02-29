// 方法1
module.exports = {
    name: 'jiangwy',
    say: function (something){
        return `${this.name} say ${something}`;
    }
}
// 方法2
// exports.name = 'jiangwy';
// exports.say = function (something) {
//     return `${this.name} say ${something}`;
// }