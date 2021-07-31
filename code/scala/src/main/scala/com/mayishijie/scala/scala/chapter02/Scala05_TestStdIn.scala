package com.mayishijie.scala.scala.chapter02

import scala.io.StdIn

/**
  * Author: Felix
  * Date: 2020/4/25
  * Desc: 获取用户键盘上的输入
  */
object Scala05_TestStdIn {
  def main(args: Array[String]): Unit = {
    println("请输入你的芳名")
    val name: String = StdIn.readLine()
    println("请输入你的芳龄")
    val age: Int = StdIn.readInt()

    println(s"欢迎${age}岁的${name}来到尚硅谷学习")

    var a:String = null


    var a1:String = null
  }
}
