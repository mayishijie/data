package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc: 单例设计模式
  *   -懒汉式
  *   -饿汉式
  *       >构造方法私有化
  *       >提供私有静态属性，接收单例对象
  *       >公共的、静态的getInstance方法
  */
object Scala16_TestSingleton {
  def main(args: Array[String]): Unit = {
    val std1: Student16 = Student16.getInstance()
    println(std1)
    val std2: Student16 = Student16.getInstance()
    println(std2)
  }
}

/*
//懒汉式
object Student16{
  private var s:Student16 = null
  def getInstance():Student16={
    if(s == null){
      s = new Student16
    }
    s
  }
}
*/
//饿汉式
object Student16{
  private var s:Student16 = new Student16
  def getInstance():Student16={
    s
  }
}
//主构造方法私有化
class Student16 private(){}

