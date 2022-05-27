import React from 'react';

export default function Rating(props) {
  // console.log(props.value);
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        <i
          className={
            props.value >= 1
              ? 'fa fa-fw fa-star'
              : props.value >= 0.5
              ? 'fa fa-fw fa-star-half-o'
              : 'fa fa-fw fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 2
              ? 'fa fa-fw fa-star'
              : props.value >= 1.5
              ? 'fa fa-fw fa-star-half-o'
              : 'fa fa-fw fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 3
              ? 'fa fa-fw fa-star'
              : props.value >= 2.5
              ? 'fa fa-fw fa-star-half-o'
              : 'fa fa-fw fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 4
              ? 'fa fa-fw fa-star'
              : props.value >= 3.5
              ? 'fa fa-fw fa-star-half-o'
              : 'fa fa-fw fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 5
              ? 'fa fa-fw fa-star'
              : props.value >= 4.5
              ? 'fa fa-fw fa-star-half-o'
              : 'fa fa-fw fa-star-o'
          }
        ></i>
      </span>
      <span id="rating-text">&nbsp;&nbsp;{props.text ? props.text : ''}</span>
    </div>
  );
}