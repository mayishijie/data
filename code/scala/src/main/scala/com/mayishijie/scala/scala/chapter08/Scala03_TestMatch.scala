package com.mayishijie.scala.scala.chapter08

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc: 模式匹配扩展案例
  */
object Scala03_TestMatch {
  def main(args: Array[String]): Unit = {
    //val list: List[(String, Int)] = List(("a", 1), ("b", 2), ("c", 3))

    //对list进行遍历，输出元组中的第一个元素
    //for (elem <- list) {
    //  println(elem._1)
    //}

    //特殊的模式匹配1
    //for ((word,count) <- list) {
    //  println(word)
    //}

    //for ((word,_) <- list) {
    //  println(word)
    //}

    //for (("a",count) <- list) {
    //  println(count)
    //}

    //特殊的模式匹配2 在模式匹配的时候，给元组元素命名
    //val (id,name,age): (Int, String, Int) = (100,"jingjing",18)
    //println(name)

    //元组  key不变，value*2
    //val list: List[(String, Int)] = List(("a", 1), ("b", 2), ("c", 3))
    //val newList: List[(String, Int)] = list.map(
    //  t => {
    //    (t._1, t._2 * 2)
    //  }
    //)
    //val newList: List[(String, Int)] = list.map {
    //  t => {
    //    t match {
    //      case (word,count)=>(word,count*2)
    //    }
    //  }
    //}

    //如果匿名函数中，使用模式匹配case，要求必须用花括号括起来
    //如果一个函数参数列表中，只有一个参数，那么参数列表的小括号可以花括号代替

    //val newList: List[(String, Int)] = list.map {
    //  case (word,count)=>(word,count*2)
    //}
    //println(newList)

    //练习：使用模式匹配，  对count*2
    val list = List(("a",("a",5)),("b",("b",10)),("c",("c",20)))
    //println(list.map{
    //  //t==> ("a",("a",5))
    //  //t._2 ==>("a",5)
    //  t=>{
    //    (t._1,(t._2._1,t._2._2*2))
    //  }
    //})

    println(list.map{
      case (key,(word,count))=>{
        (key,(word,count*2))
      }
    })
  }
}
