package com.mayishijie.scala.scala.chapter05

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc: 惰性加载
  */
object Scala13_TestLazy {
  def main(args: Array[String]): Unit = {
    // lazy 惰性加载，函数的执行会被后延，什么时候用到结果，什么时候执行函数
    lazy val res: Int = sum(2,3)
    println("1.------------------")
    println("2." + res)
  }
  def sum(a:Int,b:Int): Int ={
    println("3.sum被执行")
    a + b
  }
}
