package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc: 扩展
  */

class Person23{}

object Scala23_TestExt {
  def main(args: Array[String]): Unit = {
    //创建一个Person23对象
    val per:Any = new String

    //判断per是否是Person23类型
    val res: Boolean = per.isInstanceOf[Person23]
    println(res)

    if(res){
      //将Any类型的对象per强转为Person23类型   注意：强转需要存在继承关系
      val p1: Person23 = per.asInstanceOf[Person23]
    }

    //获取类型的信息
    val clz: Class[Person23] = classOf[Person23]
    println(clz)

  }
}

// 应用类
object Test20 extends App {
  println("xxxxxxxxxxx");

  type MyS = String
  private val abc: MyS = "abc"
}

