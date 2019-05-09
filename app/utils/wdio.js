/**
 * @desc wilddog io 操作封装
 */

/**
 * 遍历数据
 */
const each = (ref, fn) => {
  ref.on('child_added', (snap) => {
    let item = snap.val();
    let id = snap.key();
    fn && fn(item, id);
  });
};

/**
 * 移除数据
 */
const remove = (ref, id) => {
  ref.child(id).remove();
};

/**
 * 新增数据
 */
const add = (ref, item) => {
  ref.push(item);
};

/**
 * 设置数据
 */
const set = (ref, item) => {
  ref.set(item);
};

export {
  each,
  remove,
  add,
  set, 
}