/**8
 * 缓存的配置文件
 * @type {{fileMatch: RegExp, maxAge: number}}
 */
exports.CachedType = {
    fileMatch: /^\.(gif|png|jpg|js|css)$/ig,
    maxAge: 30//缓存时间默认30秒
};

/****
 * 压缩的格式
 * @type {{}}
 */

exports.CompressType={
    match:/\.(css|js|html)/ig
};