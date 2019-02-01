/**
 * todolist store
 * @author ranguangyu
 * @date 2019-2-1
 */

import { observable, action } from "mobx";

export default class TodoListStore {
  @observable dataSource = [
    { desc: '丝丝', status: 'unfinished' },
    { desc: '无可奈何花落去', status: 'finished' },
    { desc: '朝三暮四', status: 'unfinished' },
    { desc: '飞飞', status: 'finished' },
    { desc: '基恩', status: 'unfinished' }
  ];

  @action
  add(item) {
    this.dataSource.unshift(item);
  }

  @action
  done(index) {
    this.dataSource[index]['status'] = 'finished';
  }
}
