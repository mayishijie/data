package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc: 匿名子类
  */

abstract class Person14{
  var name:String
  var m1:Unit
}
object Scala14_TestNon {
  def main(args: Array[String]): Unit = {
    //抽象类不能被实例化   可以通过匿名子类的方式创建对象
    val per:Person14 = new Person14 {
      override var name: String = "atguigu"
      override var m1: Unit = {
        println("hello")
      }
    }
    println(per.name)
    per.m1
  }
}
