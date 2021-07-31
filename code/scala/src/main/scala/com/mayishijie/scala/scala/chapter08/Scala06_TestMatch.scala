package com.mayishijie.scala.scala.chapter08

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc: 偏函数使用
  */
object Scala06_TestMatch {
  def main(args: Array[String]): Unit = {

    //需求：将集合中Int类型元素 +１，字符串类型元素去掉
    val list: List[Any] = List(1,2,3,"test",4,5,6)


    /*//过滤掉字符串
    val newList: List[Any] = list.filter(_.isInstanceOf[Int])

    val res: List[Int] = newList.map {
      //elem =>elem + 1
      //elem => elem.asInstanceOf[Int] + 1
      //elem =>elem.toString.toInt + 1
      case a:Int =>a+1
    }
    println(res)
*/
    //list.collect{case elem:Int=>elem + 1}.foreach(println)
    //list.map{case elem:Int=>elem + 1}.foreach(println)
  }
}
