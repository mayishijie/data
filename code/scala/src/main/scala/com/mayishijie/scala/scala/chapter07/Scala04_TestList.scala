package com.mayishijie.scala.scala.chapter07

/**
  * Author: Felix
  * Date: 2020/5/4
  * Desc: 不可变集合List
  */
object Scala04_TestList {
  def main(args: Array[String]): Unit = {
    //创建List集合,因为List是抽象的，只能通过apply方式创建
    val list: List[Int] = List(1,2,3,4)

    //向集合中添加元素
    //val newList: List[Int] = list.+:(10)
    //val newList: List[Int] = list.:+(20)


    //在Scala语言中个，List()===>Nil 表示空集合
    //val newList: List[Int] = list.::(50)
    //val newList: List[Int] = Nil.::(40)

    //val newList: List[Int] = 10 :: 20 :: 30 :: 40 :: Nil
    //println(list.getClass)
    //println(list)
    //println(newList)

    //扁平化   将整体拆分为个体的过程
    val list2 : List[Int] = List(1,2,3,4)
    val list3 : List[Int] = List(5,6)

    //向集合中添加元素  ::
    //val newList: List[Any] = list2 :: list3

    val newList: List[Int] = list2 ::: list3
    println(newList)

    //获取集合中的某一个元素
    println(newList(1))

    newList.foreach(println)


  }
}
