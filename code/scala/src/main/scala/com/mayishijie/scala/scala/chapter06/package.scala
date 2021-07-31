package com.mayishijie.scala.scala

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc: 包对象
  *     -在包对象中声明的属性和方法可以被当前包下的类和伴生对象共享
  */
package object chapter06 {
  var shareVal = "atguigu"
  def shareMethod(): Unit ={
    println("atguigu")
  }
}
