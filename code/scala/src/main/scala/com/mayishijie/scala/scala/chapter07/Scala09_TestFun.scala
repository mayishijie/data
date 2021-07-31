package com.mayishijie.scala.scala.chapter07

/**
  * Author: Felix
  * Date: 2020/5/4
  * Desc: 基本属性和常用的操作
  */
object Scala09_TestFun {
  def main(args: Array[String]): Unit = {
    val list: List[Int] = List(1,2,3,4,5,6)
    //（1）获取集合长度
    //println(list.length)
    //（2）获取集合大小
    //println(list.size)
    //（3）循环遍历
    //println(list)
    //list.foreach(println)
    //（4）迭代器
    //for (elem <- list.iterator) {
    //  println(elem)
    //}
    //（5）生成字符串
    //val res: String = list.mkString(",")
    //println(res)
    //（6）是否包含
    println(list.contains(1))
  }
}
