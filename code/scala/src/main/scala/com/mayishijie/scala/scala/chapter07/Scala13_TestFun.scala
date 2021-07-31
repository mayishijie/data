package com.mayishijie.scala.scala.chapter07

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc:
  *   -简化|规约
  *     >通过指定的逻辑将集合中的数据进行聚合，从而减少数据，最终获取结果。
  *     >reduce
  *         底层调用的是reduceLedft
  *         函数参数类型必须一致
  *     >reduceLeft    函数参数类型可以不一致
  *     >reduceRight   函数参数类型可以不一致
  *   -折叠
  *       fold|foldLeft|foldRight
  */
object Scala13_TestFun {
  def main(args: Array[String]): Unit = {
    //val list: List[Int] = List(1,2,3,4)
    //val res: Int = list.reduce((a:Int,b:Int)=>{a+b})
    //val res: Int = list.reduce(_+_)
    //val res: Int = list.reduceLeft(_+_)
    //val res: Int = list.reduceRight(_+_)
    //println(res)

    //println(list.reduceLeft(_ - _))//-8
    //println(list.reduceRight(_ - _))//-2

    val list2: List[Int] = List(3,4,5,8,10)
    //val res: Int = list2.reduceRight(_-_)   //6

    //println(res)

    //折叠   集合外元素和集合内部元素进行聚合
    //val res: Int = list.fold(10)(_+_)
    //println(res)

    //println(list.foldLeft(10)(_ + _))

    println(list2.foldRight(11)(_ - _))



  }
}
