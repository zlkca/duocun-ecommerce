import React from 'react';
import './Progress.scss';

export const Progress = () => {
  return <div class="progress">
    <div class="loader-wrapper">
    </div>
    <div class="loader"></div>
    <div id="load_title">拼命加载中...</div>
  </div>
}