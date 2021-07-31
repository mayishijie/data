package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/29
  * Desc:
  *   -管理类（注意：并不是管理源文件）
  *   -避免命名冲突
  *   -控制权限
  */
object Scala02_TestPackage {
  def main(args: Array[String]): Unit = {
    println("包的测试")
    println(shareVal)
    shareMethod()
  }
}
