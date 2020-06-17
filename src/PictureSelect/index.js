import React from "react";
import "./PictureSelect.scss";
import { Checkbox } from 'antd';

function PictureItem(props) {
  let picInfo = props.picInfo
  let onChange = props.onChange
  let selectvalue = props.value

  function changeSelect(e) {
    let id = e.target.id
    let checked = e.target.checked
    if(checked) {
      selectvalue.push(id)
    } else {
      let index= selectvalue.findIndex(item => item === id)
      selectvalue.splice(index, 1)
    }
    onChange(selectvalue.slice())
  }

  return (
    <div className="wrapper">
      <img src={picInfo.url} alt={picInfo.name}/>
      <div className="checkwrapper">
        <Checkbox onChange={changeSelect} checked={props.isChecked} id={picInfo.id}></Checkbox>
      </div>
      <div className="picName">
        <span>
          {picInfo.name}
        </span>
      </div>
    </div>
  )
}

export default function (props) {
  let pictureList = props.pictures
  let onChange = props.onChange
  let value = props.value

  function isChecked(id) {
    return value.includes(id)
  }

  function selectAll(e) {
    if(value.length === pictureList.length) {
      onChange([])
    } else {
      let length = pictureList.length
      let fillAry = new Array(length)
      for(let i = 0; i < length; i++) {
        fillAry[i] = (i + 1).toString()
      }
      onChange(fillAry)
    }
  }

  return (
    <div>
      <div className="select">
        <div className="button">
          <Checkbox onChange={selectAll} checked={value.length === pictureList.length} ></Checkbox>
          <span className="selectCount">
            已选中{value.length}个文件
          </span>
        </div>
      </div>
      {
        pictureList.map(item => {
          return <PictureItem key={item.id} picInfo={item} onChange={onChange} isChecked={isChecked(item.id)} value={value} />
        })
      }
    </div>
  )
}
