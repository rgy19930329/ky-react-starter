/**
 * 单选框组件
 * @author ranguangyu
 * @date 2019-01-27
 */

import React from 'react';
import EnumCheckbox from './EnumCheckbox';
import EnumRadio from './EnumRadio';

class EnumChoice extends React.Component {}

EnumChoice.Checkbox = EnumCheckbox;
EnumChoice.Radio = EnumRadio;

export default EnumChoice;
